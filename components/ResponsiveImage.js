import React from 'react';

const buildSrcSet = (url) => {
  const [filename, ...other] = url.split('/').reverse();
  const baseurl = other.reverse().join('/');
  const [basename, extname] = filename.split('.');
  return [
    url,
    `${baseurl}/${basename}@2x.${extname} 2x`,
    `${baseurl}/${basename}@3x.${extname} 3x`,
  ];
};

const ResponsiveImage = ({ src, alt, ...props }) => {
  const imageSrcSet = buildSrcSet(src);
  return (
    <img
      alt={alt || src}
      src={src}
      srcSet={imageSrcSet.join(', ')}
      {...props} />
  );
};

export default ResponsiveImage;
