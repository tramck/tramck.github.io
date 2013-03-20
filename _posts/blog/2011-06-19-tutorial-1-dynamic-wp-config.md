---              
layout: default
title: "TUTORIAL #1: DYNAMIC WP-CONFIG"
category: blog
excerpt: In my experience developing websites using WordPress as a content management system, I almost always find the need to have a development environment on my local machine, a staging environment on my web server or sometimes on the client’s web server, and the final production environment. One thing that can be somewhat tedious is keeping up with having separate wp-config.php files for each wordpress installation.
image: tut.gif
---
In my experience developing websites using WordPress as a content management system, I almost always find the need to have a development environment on my local machine, a staging environment on my web server or sometimes on the client’s web server, and the final production environment. One thing that can be somewhat tedious is keeping up with having separate wp-config.php files for each wordpress installation.

My solution to dealing with multiple environments with WordPress is using php’s `$_SERVER['SERVER_NAME']` preset variable. What this does is let your code know what server it is on so that it can make the decision to connect to a certain database.

    if ($_SERVER['SERVER_NAME'] == 'localhost') {
        $db_name = 'my_local_database';
        $db_user = 'root';
        $db_pass = 'root';
        $db_host = 'localhost';
    }
    elseif ($_SERVER['SERVER_NAME'] == 'staging.travmckinney.com') {
        $db_name = 'my_staging_database';
        $db_user = 'staging_db_user';
        $db_pass = 'staging_db_password';
        $db_host = 'localhost';
    }
    elseif ($_SERVER['SERVER_NAME'] == 'myclientsurl.com') {
        $db_name = 'client_database';
        $db_user = 'client_db_user';
        $db_pass = 'client_db_password';
        $db_host = 'localhost';
    }
    // ** MySQL settings - You can get this info from your web host ** //
    /** The name of the database for WordPress */
    define('DB_NAME', $db_name);
    /** MySQL database username */
    define('DB_USER', $db_user);
    /** MySQL database password */
    define('DB_PASSWORD', $db_pass);
    /** MySQL hostname */
    define('DB_HOST', $db_host);
    /** Database Charset to use in creating database tables. */
    define('DB_CHARSET', 'utf8');

If you aren’t sure exactly what string `$_SERVER['SERVER_NAME']` will return just create a php file where your WordPress installation is with `echo $_SERVER['SERVER_NAME'];` in it and navigate to that file in your browser to see what it echoes. And it is really as easy as that.