const PI = 3.14;
let radius = 3; 
let area = 0;

area = radius * radius * PI;
console.log("Area1:", area);

radius = 4; 
area = radius * radius * PI;
console.log("Area2:", area);

function circleArea(r) {
  return r * r * PI;
}

let area3 = circleArea(3); 
console.log("Area of circle with radius 3 is:", area3);

