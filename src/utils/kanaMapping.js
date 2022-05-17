import typeOf from './typeOf';

export function applyMapping(string, mapping, convertEnding) {
  const root = mapping;

  function nextSubtree(tree, nextChar) {
    const subtree = tree[nextChar];
    if (subtree === undefined) {
      return undefined;
    }
    // if the next child node does not have a node value, set its node value to the input
    return Object.assign({ '': tree[''] + nextChar }, tree[nextChar]);
  }

  function newChunk(remaining, currentCursor) {
    // start parsing a new chunk
    const firstChar = remaining.charAt(0);

    return parse(
      Object.assign({ '': firstChar }, root[firstChar]),
      remaining.slice(1),
      currentCursor,
      currentCursor + 1
    );
  }

  function parse(tree, remaining, lastCursor, currentCursor) {
    if (!remaining) {
      if (convertEnding || Object.keys(tree).length === 1) {
        // nothing more to consume, just commit the last chunk and return it
        // so as to not have an empty element at the end of the result
        return tree[''] ? [[lastCursor, currentCursor, tree['']]] : [];
      }
      // if we don't want to convert the ending, because there are still possible continuations
      // return null as the final node value
      return [[lastCursor, currentCursor, null]];
    }

    if (Object.keys(tree).length === 1) {
      return [[lastCursor, currentCursor, tree['']]].concat(
        newChunk(remaining, currentCursor)
      );
    }

    const subtree = nextSubtree(tree, remaining.charAt(0));

    if (subtree === undefined) {
      return [[lastCursor, currentCursor, tree['']]].concat(
        newChunk(remaining, currentCursor)
      );
    }
    // continue current branch
    return parse(subtree, remaining.slice(1), lastCursor, currentCursor + 1);
  }

  return newChunk(string, 0);
}

// transform the tree, so that for example hepburnTree['ゔ']['ぁ'][''] === 'va'
// or kanaTree['k']['y']['a'][''] === 'きゃ'
export function transform(tree) {
  return Object.entries(tree).reduce((map, [char, subtree]) => {
    const endOfBranch = typeOf(subtree) === 'string';
    // eslint-disable-next-line no-param-reassign
    map[char] = endOfBranch ? { '': subtree } : transform(subtree);
    return map;
  }, {});
}

export function getSubTreeOf(tree, string) {
  return string.split('').reduce((correctSubTree, char) => {
    if (correctSubTree[char] === undefined) {
      // eslint-disable-next-line no-param-reassign
      correctSubTree[char] = {};
    }
    return correctSubTree[char];
  }, tree);
}

/**
 * Creates a custom mapping tree, returns a function that accepts a defaultMap which the newly created customMapping will be merged with and returned
 * (customMap) => (defaultMap) => mergedMap
 * @param  {Object} customMap { 'ka' : 'な' }
 * @return {Function} (defaultMap) => defaultMergedWithCustomMap
 * @example
 * const sillyMap = createCustomMapping({ 'ちゃ': 'time', '茎': 'cookie'　});
 * // sillyMap is passed defaultMapping to merge with when called in toRomaji()
 * toRomaji("It's 茎 ちゃ よ", { customRomajiMapping: sillyMap });
 * // => 'It's cookie time yo';
 */
export function createCustomMapping(customMap = {}) {
  const customTree = {};

  if (typeOf(customMap) === 'object') {
    Object.entries(customMap).forEach(([roma, kana]) => {
      let subTree = customTree;
      roma.split('').forEach((char) => {
        if (subTree[char] === undefined) {
          subTree[char] = {};
        }
        subTree = subTree[char];
      });
      subTree[''] = kana;
    });
  }

  return function makeMap(map) {
    const mapCopy = JSON.parse(JSON.stringify(map));

    function transformMap(mapSubtree, customSubtree) {
      if (mapSubtree === undefined || typeOf(mapSubtree) === 'string') {
        return customSubtree;
      }
      return Object.entries(customSubtree).reduce(
        (newSubtree, [char, subtree]) => {
          // eslint-disable-next-line no-param-reassign
          newSubtree[char] = transformMap(mapSubtree[char], subtree);
          return newSubtree;
        },
        mapSubtree
      );
    }

    return transformMap(mapCopy, customTree);
  };
}

// allow consumer to pass either function or object as customMapping
export function mergeCustomMapping(map, customMapping) {
  if (!customMapping) {
    return map;
  }
  return typeOf(customMapping) === 'function'
    ? customMapping(map)
    : createCustomMapping(customMapping)(map);
}
