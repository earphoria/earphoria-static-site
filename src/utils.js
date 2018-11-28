// helper, utility functions
export function truncateString(s, n) {
  var cut = s.indexOf(' ', n)
  if (cut == -1) return s
  return s.substring(0, cut)
}

function random_item(items)
{

return items[Math.floor(Math.random()*items.length)];

}
