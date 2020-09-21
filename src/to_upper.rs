fn main() {
  println!("{}", upper_letter("legia"));
  println!("{}", upper_letter("warszawa"));
  println!("{}", upper_letter("boris"));
}

fn upper_letter(s: &str) -> String {
  let mut c = s.chars();
  match c.next() {
    None => String::new(),
    Some(f) => f.to_uppercase().chain(c).collect(),
  }
}
