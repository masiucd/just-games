#[derive(Debug)]
struct Person {
    name: String,
    age: u8,
}

struct Pair(i32, i32);

fn main() {
    let bobby = Person {
        name: String::from("Bobby"),
        age: 34,
    };

    println!(
        "bobby is a struct: age of  {} and name {}",
        bobby.age, bobby.name
    );

    let pair = Pair(33, 23);
    println!("pair {:#?}", pair.0);

    let res = rect_area(&pair);
    println!("area would be : {}", res);
}

fn rect_area(pair: &Pair) -> i32 {
    pair.0 * pair.1
}
