use rand::Rng;
use std::cmp::Ordering;
use std::io;
use std::process;

fn main() {
    let s = String::from("Legia");

    // take_ownership(s);

    // takes_and_gives_back(s);

    let s_len = calc_length(s);

    println!("{:?}", s_len);

    let x = 24;

    make_copy(x);

    println!("{}", x);
}

fn take_ownership(random_string: String) {
    println!("{}", random_string);
}

fn takes_and_gives_back(a_string: String) -> String {
    a_string
}

fn make_copy(some_int: u32) {
    println!("{} ", some_int);
}

fn calc_length(s: String) -> (String, usize) {
    let len = s.len();
    (s, len)
}
