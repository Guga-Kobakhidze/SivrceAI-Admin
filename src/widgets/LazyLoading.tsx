import Loading, { LoadingProps } from "./Loading";

type LazyLoadingProps = Omit<LoadingProps, "delay"> &
  Required<Pick<LoadingProps, "show">>;

const LazyLoading: React.FC<LazyLoadingProps> = ({ size, show }) => {
  return <Loading show={show} delay={500} size={size} />;
};

export default LazyLoading;
