# Technology stack
+ [PHP](http://php.net/) 8
+ [Composer](https://getcomposer.org/) dependency manager
+ [Twig 3](https://twig.symfony.com/) template engine

# Setting up
```bash
git clone https://github.com/ecomplus/ecomplus.github.io.git
cd ecomplus.github.io/build
composer install
```

## Run script
```bash
php -f main.php
```

Force update APIs object:
```bash
php -f main.php update-apis
```
