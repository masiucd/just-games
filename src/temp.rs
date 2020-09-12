use rand::Rng;
use std::cmp::Ordering;
use std::io;
use std::process;

fn main() {
    println!("choose tour temperature");

    let mut inputNumber = String::new();

    io::stdin()
        .read_line(&mut inputNumber)
        .expect("failed to read line");

    let inputNumber: f32 = inputNumber
        .trim()
        .parse::<f32>()
        .expect("please type a number!");

    let c = 10.00;
    let cToF = celsiusToFahrenheit(inputNumber);
    let fToC = fahrenheitToCelsius(inputNumber);
    println!(
        "{} degrees celsius will be: {} Fahrenheit",
        inputNumber, cToF
    );
    println!(
        "{} degrees fahrenheit will be: {:.2} Celsius",
        inputNumber, fToC
    );
}

fn celsiusToFahrenheit(temp: f32) -> f32 {
    let result = (temp * 1.8000) + 32.00;
    println!("{}", result);
    result
}
fn fahrenheitToCelsius(temp: f32) -> f32 {
    let result = (temp - 32.00) / 1.8;
    println!("{:.2}", result);
    result
}
