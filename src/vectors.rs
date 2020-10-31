fn main() {
  let collected_iterator: Vec<i32> = (0..10).collect();
  // println!("Collected (0..10) into: {:?}", collected_iterator);

  let mut xs = vec![1i32, 2, 3];
  // println!("Initial vector: {:?}", xs);

  for v in collected_iterator {
    // println!("v is  {} ", v);
  }

  println!("insert new item into xs");
  let four_teen = 14;
  xs.push(four_teen);
  println!("now xs has {} as well  {:?}", four_teen, xs);

  let xsLen = get_len(&xs); // we need to barrow the xs vector, make a reference
  println!("xs length is : {:?}", xsLen);

  for x in xs.iter() {
    println!("x > {}", x);
  }
}
// make a reference to vector xs
fn get_len(xs: &Vec<i32>) -> usize {
  xs.len()
}
