use rand::Rng;
use std::cmp::Ordering;
use std::io;

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

    println!("enter the second number");

    let mut second_num = String::new();
    io::stdin().read_line(&mut second_num);

    let a: u32 = first_num.trim().parse().expect("NaN number");
    let b: u32 = second_num.trim().parse().expect("NaN number");

    let res = sum(a, b);

    println!("result {} + {} = {} ", first_num, second_num, res);
}
