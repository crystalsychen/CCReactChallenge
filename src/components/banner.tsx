type BannerProps = {
    title: string;
}
const Banner = ({title}: BannerProps) => {
    return (
        <h1 className="text-3xl font-bold">{title}</h1>
      )
}
export default Banner