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
fn main() {
    let secret_number = rand::thread_rng().gen_range(1, 101);
    loop {
        println!("Please enter a first number: ");
        let a = read_user_input();

        println!("Please enter a second number: ");
        let b = read_user_input();

        let result = sum(a, b);
        println!("{} + {} = {}", a, b, result);

        match result.cmp(&secret_number) {
            Ordering::Less => println!("to small"),
            Ordering::Greater => println!("to large"),
            Ordering::Equal => {
                println!("correct");
                break;
            }
        }
    }
}

fn sum(a: u32, b: u32) -> u32 {
    a + b
}

fn read_user_input() -> u32 {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();

    let digit: u32;

    match input.trim().parse() {
        Ok(val) => digit = val,
        Err(_err) => {
            println!("Not a valid number!");
            process::exit(1);
        }
    };

    digit
}

fn fac(num: u32) -> u32 {
    if num <= 2 {
        num
    } else {
        num * fac(num - 1)
    }
}

fn facWithMatch(num: u32) -> u32 {
    match num {
        1 | 2 => num,
        _ => num * fac(num - 1),
    }
}
