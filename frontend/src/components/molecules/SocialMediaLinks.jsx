import Icon from "../atoms/Icon";

const SocialLinks = () => (
  <div className="flex justify-around mb-4">
    <a
      href="#"
      className="border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center"
    >
      <Icon iconClass="fab fa-facebook-f" />
    </a>
    <a
      href="#"
      className="border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center"
    >
      <Icon iconClass="fab fa-google-plus-g" />
    </a>
    <a
      href="#"
      className="border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center"
    >
      <Icon iconClass="fab fa-linkedin-in" />
    </a>
  </div>
);

export default SocialLinks;
