import { Category } from './Category';
import { Type } from './Type';
import { BooleanChooseField } from './BooleanChooseField';

export function Form({ props }) {
  const { texts, form, formErrors, handleSubmit, categorySelectRef, typeSelectRef, handleChange } = props;
  const hasEmptyFields = Object.values(formErrors).some((error) => error);

  return (
    <form className=" ml-4 pt-4 md:mx-16 md:pt-12" onSubmit={handleSubmit}>
      <Category texts={texts} handleChange={handleChange} reference={categorySelectRef} />
      <Type texts={texts} handleChange={handleChange} reference={typeSelectRef} />
      <BooleanChooseField
        texts={texts}
        form={form}
        handleChange={handleChange}
        fieldName="isNsfw"
        idValueDictionary={[
          { id: 'sfw', value: true, text: texts.sfw },
          { id: 'nsfw', value: false, text: texts.nsfw }
        ]}
      />
      <BooleanChooseField
        texts={texts}
        form={form}
        handleChange={handleChange}
        fieldName="isUncropped"
        idValueDictionary={[
          { id: 'cropped', value: true, text: texts.cropped },
          { id: 'uncropped', value: false, text: texts.unCropped }
        ]}
      />
      <BooleanChooseField
        texts={texts}
        form={form}
        handleChange={handleChange}
        fieldName="isMeme"
        idValueDictionary={[
          { id: 'meme', value: true, text: texts.meme },
          { id: 'notmeme', value: false, text: texts.notMeme }
        ]}
      />
      <button type="submit" disabled={hasEmptyFields} className="mb-4 mt-3 flex rounded-full bg-gray-300 py-2 px-4 font-bold text-gray-800 disabled:opacity-25 hover:bg-gray-400 md:mb-24">
        {texts.sort}
      </button>
    </form>
  );
}
