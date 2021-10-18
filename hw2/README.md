
#hw2
##compare with hw1
- slightly tuned the width of albums list and preview photo list, and captions bellow title bar of preview photo list.
- selected album and photo inherit hover effect
- js included and take action

##interface
- default 4 albums shown on the left, with albums 1 selected and first photo selected.
- captions on the album list will shown total number of albums and photos
- captions on the photo list will shown the sequence of currently selected photo
- title of third section will shown name of the photo, but I have no time to name all the photo
- captions of the third section will shown meta data of photo, but I have no time to make those fake data

##function
1. only i albums and photo will be selected, and selected photo will be shown as the largest photo on the right
2. hover effect on albums and preview photos, while selected album and photo will inherit same effect with addition of selected effect
3. while click on album and photo, it will be selected
4. click on album and photo will refresh the photo list and main Img if needed
5. when clicked on empty album, dialog will be shown, while cover of empty aalbum is randomly picked form Unsplash database
6. RWD is remained as in hw1
7. while click on delete button at the bottom of albums list, current selected album will be delete if user confirm action via dialog
8. while click on delete button at the top right of main Img, current main Img will be delete if user confirm action via dialog, this action wont change album cover cause I have no time to do it.
9. while click on new album button, new empty album will be created with the name that user typed in dialog
10. scroll bar is hidden in default if browser support, while scrolling will show it