use std::io;

fn main() {
    println!("guess a number");
    println!("please input a number");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("failed to read line");

    println!("You guessed: {}", guess);
}


// let foo = 5; // immutable
// let mut bar = 5; // mutable
