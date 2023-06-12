interface ModalProps {
  setShowInfoModal: (value: boolean) => void;
  texts: { projectDocumentation: string; features: string; close: string; projectDocs: { MemeGeneration: string; SortingOptions: string; features: string; accessAndAuthorization: string; info: string; revenueModel: string; backendDevelopment: string; introduction: string; HOC: string; accesAndAuthotrization: string } };
}
const Modal: React.FC<ModalProps> = ({ texts, setShowInfoModal }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 mt-4 h-screen px-4 pb-6 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
      </div>
      <div className=" h-full transform overflow-y-scroll rounded-lg bg-gray-700 p-8 text-white shadow-xl transition-all scrollbar-thin  scrollbar-track-gray-600 scrollbar-thumb-orange-600 sm:w-full sm:max-w-lg" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <h3 className="text-lg font-medium"> {texts.projectDocumentation}</h3>
        <p className="mt-4 ">{texts.projectDocs.introduction}</p>
        <p className="mt-4 ">{texts.projectDocs.accessAndAuthorization}</p>
        <h4 className="mt-6 text-lg font-medium"> {texts.features} </h4>
        <p className="mt-4 ">{texts.projectDocs.features}</p>
        <p className="mt-4 ">{texts.projectDocs.SortingOptions}</p>
        <p className="mt-4 ">{texts.projectDocs.MemeGeneration}</p>
        <p className="mt-4 ">{texts.projectDocs.HOC}</p>

        <p className="mt-4 ">{texts.projectDocs.backendDevelopment}</p>
        <p className="mt-4 ">{texts.projectDocs.revenueModel}</p>
        <p className="mt-4 ">{texts.projectDocs.info}</p>
        <button
          className="mt-6 ml-1 rounded border-b-4 border-orange-800 bg-orange-700 px-2 font-bold text-black shadow-lg hover:border-orange-500 hover:bg-orange-400"
          onClick={() => {
            setShowInfoModal(false);
          }}
        >
          {texts.close}
        </button>
      </div>
    </div>
  );
};

export default Modal;
