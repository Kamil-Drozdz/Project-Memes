import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface PropsFooter {
  icon?: IconProp;
  reference: string;
  txt: string;
  value: string;
}

export const FooterIcon = ({ icon, reference, txt, value }: PropsFooter): React.ReactElement => {
  return (
    <button>
      <div className={`text-3xl leading-3 ${value}`}>
        <a className="mr-20 w-auto flex-col-reverse" target="_blank" href={reference} rel="noreferrer">
          {icon ? <FontAwesomeIcon icon={icon} /> : null}
          <p className="text-sm">{txt}</p>
        </a>
      </div>
    </button>
  );
};
