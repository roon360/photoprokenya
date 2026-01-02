## Images Folder

Use this folder to store all the images used on your landing page.

### Recommended Structure

- `images/before1.jpg` – First \"before\" photo example  
- `images/after1.jpg` – First \"after\" photo example  
- `images/before2.jpg` – Second \"before\" photo example  
- `images/after2.jpg` – Second \"after\" photo example  
- `images/logo.png` – Your logo (optional)  

You can name the files however you like, but make sure the file paths in `index.html` match.

### How to Connect Images in `index.html`

In the gallery section, replace the placeholders with your real images, for example:

```html
<div class="before-after">
  <div class="image-placeholder before">
    <img src="images/before1.jpg" alt="Before editing">
  </div>
  <div class="image-placeholder after">
    <img src="images/after1.jpg" alt="After editing">
  </div>
</div>
```

Do this for each gallery item and any other place you want to show real photos.










