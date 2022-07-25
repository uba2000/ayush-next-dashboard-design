export function fTags(tags) {
  return tags.split(', ');
}

export function fJoinTags(tags) {
  return tags.join(', ');
}

export function splitToArray(tags) {
  return tags.split(',').map((item) => {
    return item.trim();
  });
}

export function joinFromArray(tags) {
  return tags.join(', ');
}
