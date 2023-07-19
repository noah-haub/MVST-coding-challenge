.DEFAULT_GOAL := help
help:
	@echo 'You didn't define this command you dumb ass bitch!'

git:
	git checkout development			# switch to development branch
	git add .                        	# adds every file in this directory to git
	git commit -m "$m"        		 	# commits git to github with message '$m'
	git push -f origin development   	# force pushes the commit to the development branch

###
###
