fn main() {
  let num1 = 100;
  let num2 = 5;
  let result = addition(num1, num2);
  let result2 = multiplication(num1, num2);
  let result3 = division(num1, num2);
  let result4 = subtraction(num1, num2);
  println!("sum of {} , {} is {} ", num1, num2, result);
  println!("product of {} , {} is {} ", num1, num2, result2);
  println!("quotient of {} , {} is {} ", num1, num2, result3);
  println!("difference of {} , {} is {} ", num1, num2, result4);
}

fn addition(a: i32, b: i32) -> i32 {
  a + b
}
fn multiplication(a: i32, b: i32) -> i32 {
  a * b
}
fn division(a: i32, b: i32) -> i32 {
  a / b
}
fn subtraction(a: i32, b: i32) -> i32 {
  a - b
}
