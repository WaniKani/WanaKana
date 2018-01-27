import typeOf from './typeOf';
import isJapanese from '../isJapanese';

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
      // if we don't want to convert the ending, because there are still possible continuations left, just return null as the final node value
      return [[lastCursor, currentCursor, null]];
    }

    if (Object.keys(tree).length === 1) {
      return [[lastCursor, currentCursor, tree['']]].concat(newChunk(remaining, currentCursor));
    }

    const subtree = nextSubtree(tree, remaining.charAt(0));
    if (subtree === undefined) {
      return [[lastCursor, currentCursor, tree['']]].concat(newChunk(remaining, currentCursor));
    }

    // continue current branch
    return parse(subtree, remaining.slice(1), lastCursor, currentCursor + 1);
  }
  return newChunk(string, 0);
}

// transform the tree, so that for example hepburnTree['ゔ']['ぁ'][''] === 'va'
// or kanaTree['k']['y']['a'][''] === 'きゃ'
export function transform(tree) {
  const result = {};
  for (const [char, subtree] of Object.entries(tree)) {
    if (typeOf(subtree) === 'string') {
      // we have reached the bottom of this branch
      result[char] = { '': subtree };
    } else {
      // more subtrees to go through
      result[char] = transform(subtree);
    }
  }
  return result;
}

export function getSubTreeOf(tree, string) {
  let correctSubTree = tree;
  for (const char of string) {
    if (correctSubTree[char] === undefined) {
      correctSubTree[char] = {};
    }
    correctSubTree = correctSubTree[char];
  }
  return correctSubTree;
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
export function createCustomMapping(customMap) {
  const customTree = {};
  for (const [rom, kan] of Object.entries(customMap)) {
    let subTree = customTree;
    for (const char of rom) {
      if (subTree[char] === undefined) {
        subTree[char] = {};
      }
      subTree = subTree[char];
    }
    subTree[''] = kan;
  }

  return function makeMap(map) {
    const mapCopy = JSON.parse(JSON.stringify(map));
    function transformMap(mapSubtree, customSubtree) {
      // replace the subtree
      if (mapSubtree === undefined || typeOf(mapSubtree) === 'string') {
        return customSubtree;
      }
      const result = mapSubtree;
      for (const [char, subtree] of Object.entries(customSubtree)) {
        result[char] = transformMap(mapSubtree[char], subtree);
      }
      return result;
    }
    return transformMap(mapCopy, customTree);
  };
}

// allow consumer to pass either function or object as customMapping
export function mergeCustomMapping(map = {}, customMapping = {}) {
  if (typeOf(customMapping) === 'function') {
    return customMapping(map);
  } else if (typeOf(customMapping) === 'object') {
    return createCustomMapping(customMapping)(map);
  }
  return map;
}
