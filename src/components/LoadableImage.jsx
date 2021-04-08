import { useEffect, useState } from 'react';

const LoadableImage = ({
  src,
  renderAs,
  renderSpinnerAs,
  spinner: { wrapper = {}, ...spinner } = {},
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setLoading(false);
    };
    image.src = src;
  }, [src]);

  const Component = renderAs || 'img';
  const SpinnerComponent = renderSpinnerAs;

  if (loading) {
    return (
      <div className={`center-contents spinner-wrapper`} {...wrapper}>
        <SpinnerComponent color="#D82229" {...spinner} />
      </div>
    );
  } else {
    return <Component src={src} {...props} />;
  }
};

export default LoadableImage;
