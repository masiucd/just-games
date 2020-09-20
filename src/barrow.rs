fn main() {
  // Here is how you would define and
  // use a calculate_length function that
  //  has a reference to an object as
  //  a parameter instead of taking ownership of the value:

  let s1 = String::from("Marcell!");
  println!("{}", s1);
  let s1_len = give_me_string_length(&s1);
  println!("length of s1 is  {}", s1_len);
  println!("I just borrows s1 to calculate the length  {}", s1_len);
  println!(
    "I can print now s1 more then one time because I am still the owner{}",
    s1
  );

  // The &s1 syntax lets us create
  // a reference that refers to the value of s1 but does not own it.
}

fn give_me_string_length(s: &String) -> usize {
  s.len()
}
