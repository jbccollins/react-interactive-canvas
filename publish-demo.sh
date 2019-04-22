git subtree split --prefix demo -b temp-demo # create a local temp-demo branch containing the subtree split demo folder
git push -f heroku temp-demo:master # force the push of the temp-demo branch to the remote heroku master branch
git branch -D temp-demo # delete the local temp-demo branch as it's no longer needed