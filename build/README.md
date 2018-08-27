# Technology stack
+ [PHP](http://php.net/) 7
+ [Composer](https://getcomposer.org/) dependency manager
+ [Twig 2](https://twig.symfony.com/) template engine

# Setting up
```bash
git clone https://github.com/ecomclub/ecomclub.github.io.git
cd ecomclub.github.io/build
composer install
```

## Run script
```bash
php -f main.php
```

Force update APIs object:
```bash
php -f build/main.php update-apis
```
