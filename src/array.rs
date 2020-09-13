use rand::Rng;
use std::cmp::Ordering;
use std::io;
use std::process;

fn main() {
  let xs = [1, 2, 3, 4, 5];
  let first = xs[0];
  let second = xs[1];
  println!("{},{}", first, second);

  for num in xs.iter() {
    println!("value is : {}", num);
  }

  let mut index = 0;
  while index <= xs.len() {
    println!("current value is {} ", xs[index]);
    index += 1;
  }
}
