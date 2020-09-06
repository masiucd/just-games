use rand::Rng;
use std::cmp::Ordering;
use std::io;
use std::process;

// fn main() {
//     println!("guess a number");
//     let secret_number = rand::thread_rng().gen_range(1, 101);

//     loop {
//         println!("input your  guess");

//         let mut guess = String::new();

//         io::stdin()
//             .read_line(&mut guess)
//             .expect("failes to read line");

//         let guess: u32 = guess.trim().parse().expect("please type a number!");

//         println!("You guessed : {} ", guess);

//         match guess.cmp(&secret_number) {
//             Ordering::Less => println!("Too small"),
//             Ordering::Greater => println!("Too big"),
//             Ordering::Equal => {
//                 println!("you guessed correct!!! with number of {} ", secret_number);
//                 break;
//             }
//         }
//     }
// }

fn sum(a: u32, b: u32) -> u32 {
    a + b
}

fn main() {
    println!("enter a first number  ");

    let mut first_num = String::new();
    io::stdin().read_line(&mut first_num);

    let mut a: u32 = 0;

    match first_num.trim().parse() {
        Ok(val) => a = val,
        Err(err) => {
            println!("{} is not a valid number ", a);
            process::exit(1)
        }
    };
    println!("enter the second number");

    let mut second_num = String::new();
    io::stdin().read_line(&mut second_num);

    let mut b: u32 = 0;

    match second_num.trim().parse() {
        Ok(val) => b = val,
        Err(err) => {
            println!("{} is not a valid number ", b);
            process::exit(1)
        }
    }

    let res = sum(a, b);

    println!("result {} + {} = {} ", first_num, second_num, res);
}
