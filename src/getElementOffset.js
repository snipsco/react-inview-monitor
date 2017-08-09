// calcule the offset in pixels to top of the site,
// from a DOM element (el)
export default function getElementOffset(el) {
  let top = 0
  let left = 0

  // grab the offset of the element relative to it's parent,
  // then repeat with the parent relative to it's parent,
  // ... until we reach an element without parents.
  do {
    if (!isNaN(el.offsetTop)) {
      top += el.offsetTop
    }
    if (!isNaN(el.offsetLeft)) {
      left += el.offsetLeft
    }
    el = el.offsetParent
  } while (el)

  return { top, left }
}
