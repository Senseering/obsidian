<p align="center" >
  <img src="logo/logo.svg" width="70%">
</p>

<p align="center">
    A <a href="https://www.rust-lang.org/">Rust</a> based <a href="https://academy.binance.com/en/glossary/immutability">immutability layer</a> for data.
</p>

## Motivation

As the demand for sharing data and knowledge grows, so does the demand for fast and secure solutions that make data auditable, immutable and therefore reliable. Senseerings "Obsidian" provides a fast immutability layer that can be easily integrated into other Systems that need trust to become part of a data ecosystem.


## Install

```sh
cargo install obsidian
```


##  Usage

```
obsidian store <hash>
```

```
obsidian audit <address> <hash>
```

## Options

You can set your own immutablitiy provider with this command. Currently only iota supported.
```
obsidian --immutability https://nodes.senseering.io --type iota
```

You can set your own communication protocol. Default is via CLI, but http is also possible.
```
obsidian --protocoll http
```