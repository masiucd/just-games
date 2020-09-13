use rand::Rng;
use std::cmp::Ordering;
use std::io;
use std::process;

fn main() {
  println!("guess a number");
  let secret = rand::thread_rng().gen_range(1, 101);

  loop {
    println!("give me a number");
    let mut guess = String::new();
    io::stdin()
      .read_line(&mut guess)
      .expect("Failed to read line");
    let guess: u32 = match guess.trim().parse() {
      Ok(num) => num,
      Err(err) => continue,
    };
    println!("your guess {} ", guess);

    match guess.cmp(&secret) {
      Ordering::Less => println!("To low"),
      Ordering::Greater => println!("To Big"),
      Ordering::Equal => {
        println!("You win the game! {} ", secret);
        break;
      }
    }
  }
}
