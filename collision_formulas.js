// collision between two rectangles
const rect1 = { x: 5, y: 5, width: 50, height: 50 }
const rect2 = { x: 20, y: 10, width: 10, height: 10 }

if (rect1.x > rect2.x + rect2.width ||
  rect1.x + rect1.width < rect2.x ||
  rect1.y > rect2.y + rect2.height ||
  rect1.y + rect1.height < rect2.y) {
  // no collision
} else {
  // collision detected
}

// collision between two circles
const circle1 = { x: 10, y: 10, radius: 300 }
const circle2 = { x: 500, y: 500, radius: 150 }
// calculate distance between the two circle centers
// check if distance is larger than the sum of both radiuses (450)
// first calculate both x and y distances
// using pythagorean theorem, calculate hypothenuse, which is the distance
const dx = circle2.x - circle1.x
const dy = circle2.y - circle1.y
const distance = Math.sqrt(dx * dx + dy * dy)
const sumofRadii = circle1.radius + circle2.radius

if (distance < sumofRadii) {
  // circles collide
} else if (distance === sumofRadii) {

} else {
  // circles don't collide
}