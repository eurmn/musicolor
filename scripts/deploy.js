import ghpages from 'gh-pages';

ghpages.publish('dist', {
  async beforeAdd(git) {
    return git.add('.nojekyll');
  }
}, () => console.log('pushed gh-pages'));