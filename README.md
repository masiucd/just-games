# rust-lang

Rust programming

Just started to learn some rust, it is a really cool language that you can do a lot with. This repo will contain some very basic concepts and programs using the Rust language.
[Rust book](https://doc.rust-lang.org/book/title-page.html)

### Content

* [ownership](#ow)
* [borrowing](#br)
* [data types](#dt)
* [basics](#bcs)

## Ownership <a name = "ow"></a>

## Borrowing <a name = "br"></a>

How to make a reference to a variable without taking over the ownership

``` rust
  fn main() {

  let s1 = String::from("Marcell!");
  println!("{}", s1);
  let s1_len = give_me_string_length(&s1);
  println!("length of s1 is  {}", s1_len);
  println!("I just borrows s1 to calculate the length  {}", s1_len);
  println!(
    "I can print now s1 more then one time because I am still the owner{}",
    s1
  );
   /* The &s1 syntax lets us create */
  /* // a reference that refers to the value of s1 but does not own it. */
}

fn give_me_string_length(s: &String) -> usize {
  s.len()
}

```

If you barrow some variable and you would like to mutate the variable:

``` rust
  fn main() {
    let mut s1 = String::from("hello");
    let changed_s1 = change(&mut s1);

    println!("change s1 {:?}", changed_s1);
    println!("s1 has now got mutated {}", s1);
}

fn change(s: &mut String) {
    s.push_str(" , world!");
}

```

## Data types <a name = "dt"></a>

## basics <a name = "bcs"></a>
