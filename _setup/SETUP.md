# Website Setup Guide

## Initial Setup

### Package Management
1. Install `pak`:
   ```bash
   R -e "install.packages('pak')"
   ```

2. Configure `renv` to use `pak`:
   ```r
   # Set pak as the default installer for renv
   options(renv.config.pak.enabled = TRUE)
   renv::restore()
   ```

3. Install `babelquarto` from GitHub:
   ```bash
   R -e 'pak::pak("ropensci-review-tools/babelquarto")'
   ```

### Building and Serving
1. Render the website:
   ```bash
   R -e "babelquarto::render_website()"
   ```

2. Serve locally:
   ```bash
   R -e "servr::httw('docs')"
   ```

## Multilingual Setup Resources
- [Multi-language Quarto website guide](https://quarto-dev.marioangst.com/en/blog/posts/multi-language-quarto/) (Note: Somewhat outdated but contains useful concepts)
- [Joel Nitta's example site](https://github.com/joelnitta/joelnitta-home) (Reference implementation)
- [babelquarto documentation](https://docs.ropensci.org/babelquarto/articles/babelquarto.html#starting-a-multilingual-website) (Official documentation)

## Code Copy Features
- **Copy buttons**: All code blocks now have copy buttons in the top-right corner
- **Enhanced styling**: Code blocks have improved readability and hover effects
- **Better fonts**: Uses Fira Code monospace font for better code readability
- **Responsive design**: Code blocks adapt well to different screen sizes

## Notes
- This guide is for personal reference and won't be rendered by Quarto
- Keep this updated as the setup process evolves
- Add any site-specific procedures here 