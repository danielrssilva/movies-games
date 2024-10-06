const VersionDisplay: React.FC = () => (
  <div className="absolute bottom-5 right-5 text-white text-md bg-darkest-grey font-monomaniac-one rounded-lg p-3 group">
    <span>V {process.env.REACT_APP_VERSION}</span>
  </div>
);

export default VersionDisplay;
