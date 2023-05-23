import ReactImageMagnify from 'react-image-magnify';

const MyReactImageMagnify = ({ item }: any) => {
  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: 'Wristwatch by Ted Baker London',
          isFluidWidth: true,
          src: item.original,
        },
        largeImage: {
          src: item.original,
          width: 630,
          height: 800,
        },
        enlargedImageContainerDimensions: {
          width: '100%',
          height: '100%',
        },
        enlargedImagePortalId: 'portal',
      }}
    />
  );
};

export default MyReactImageMagnify;
