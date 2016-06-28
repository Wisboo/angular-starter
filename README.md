# angular-starter
This repository is base for angular projects

> This project is for legacy angular 1.x code and will be deprecated in favor to support components with webpack in a transition to upgrade to [Angular 2](https://angular.io/).

## Main Tools
+ [Bower](http://www.bower.io/)
+ [Babel](https://babeljs.io/)
+ [Sass](http://sass-lang.com)
+ [Jade](http://jade-lang.com)
+ [Gulp](http://gulpjs.com/)
+ [BrowserSync](http://www.browsersync.io/)

## First steps
#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)

#### Getting the dev dependencies
Run ```npm install``` from rootpath of the project.

#### The dependencies' dependencies
The sass linter we use relays on a ruby gem called scss_lint, so...
```bash
gem install scss_lint
```

#### Bower and gulp. The right way
In the following step you will need to use bower, and during the project development you will probably use gulp every day, so let's use them in the right way.
A very popular way of getting these packages is simply tell npm to install them globally using the ```-g``` flag.
That's needless as gulp and bower are already in this project dependencies. A big problem can have place if the version of the packages that were installed globally do not match the versions that this project require.
The right way to execute these tools is using the binaries in the node_modules folder, that is ```node_modules/.bin/```.
To execute bower just use the following ```./node_modules/.bin/bower```. Same for gulp.
Adding an alias for these tools is highly recommended. Like the following:
```bash
alias gulp='node_modules/.bin/gulp'
alias bower='node_modules/.bin/bower'
```

#### Getting the project dependencies
The actual dependencies that will be used to develop the app are managed using bower. You can easily get them with the following command
```bash
bower install
```
You may be asking:  why don't we simply get these packages using npm?
Here are some articles I suggest reading about bower:

+ [Why Front-End Needs a Package Manager?](frontendbabel.info/articles/bower-why-frontend-package-manager/)
+ [Is bower useful?](http://benmccormick.org/2015/01/22/is-bower-useful)
+ [What's great about bower](https://css-tricks.com/whats-great-bower/)

#### Gulp
To start your app run ```gulp``` in the rootpath of the project. Then access your app at **localhost:port**. The port is logged in the console where you ran gulp.
Take a look at **GULP_TASKS.md** for a detailed explanation of the gulp tasks.

## Development

#### Vendors
To add a vendor simply install and save it using bower, then add the path of the source files, relative to the **bower_components** folder, to **vendorJs.js** or **vendorCss.js** depending on what you are adding.
i.e: Adding jquery
```
bower install --save jquery
```
This will generate the **jquery** folder inside **bower_components**. Then, add the source file of jquery to **vendorJs.js**. It should look like this:
```
module.exports = [
  'jquery/dist/jquery.js',
];
```

## Deploy

#### S3
In order to deploy you must first create **config/aws.js** file with the credentials for the Amazon S3 bucket, this file is already added to **.gitignore** so you don't compromise the keys by pushing them to the repository. The file needs to have to follow the format specified in *config/aws.js.example*

Then you just run ```gulp build``` followed by the deploy task ```gulp s3:staging``` or ```gulp :s3:production```

Finally, you need to add a custom routing rule so that s3 handles the 404 (or 403 depending or the bucket policy) to the s3 properties. In the **Static Website Hosting** panel, check the **Enable website hosting** option and complete the form with the following:
```
Index document: index.html
```
And add this redirect rule (Depending on the bucket policy the error code to handle can be either 404 or 403)
```
<RoutingRules>
    <RoutingRule>
        <Condition>
            <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
            <ReplaceKeyPrefixWith>#/</ReplaceKeyPrefixWith>
        </Redirect>
    </RoutingRule>
</RoutingRules>
```

#### Heroku
Pushing the desired branch to heroku should be enough.

## Troubleshooting

#### npm permissions
If you are struggling with permission problems when using npm, you can try the following commands to avoid using ```sudo``` every time you have this troubles.

```bash
sudo chown -R $USER ~/.npm
```
```bash
sudo chown -R $USER .
```

#### S3 deploy
NOTE: You must have the corrects AIM permissions, if not, amazon will report an Access Denied error

#### gulp watch
If having problems with ```gulp watch```, run ```echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p```.
This solution was found [here](https://github.com/gulpjs/gulp/issues/217).

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## About

This project is maintained by [Angel Ortiz](https://github.com/aandresortiz) and it was written by [Wisboo](http://www.wisboo.com) with the help of [Wolox](http://www.wolox.com.ar).

![Wisboo](https://dfsm9194vna0o.cloudfront.net/270044-0-Logorosablanconotagline.png)
