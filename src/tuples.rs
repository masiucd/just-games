use rand::Rng;
use std::cmp::Ordering;
use std::io;
use std::process;

fn main() {
  let myTup: (i32, f64, u8) = (500, 6.54, 1);
  let (x, y, z) = myTup;
  println!("my tuple {:?}", myTup);
  println!("destructed {:?} {:?} {:?} ", x, y, z);
  println!("{}", myTup.1);
  println!("{}", myTup.0);
}
