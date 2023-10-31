import { create } from 'zustand';

let flipChoices = [];

if (window.location.pathname !== '') {
  const path = window.location.pathname.replace('/', '');

  try {
    const decodedBase64 = atob(path);
    const decodedJSON = JSON.parse(decodedBase64);

    flipChoices = decodedJSON;
  } catch (error) {
    console.error(error);
  }
}

const useSiteStore = create((set, get) => ({
  checked: 0,
  setChecked: (checked) => set({ checked }),
  runCheck: (checked) => {
    if (!checked) {
      // Reset the form.
      set({ flipChoices: [] });
    }

    set({ checked });
  },
  bookmark: window.location,
  setBookmark: (bookmark) => set({ bookmark }),
  detailId: null,
  setDetailId: (detailId) => set({ detailId }),
  flipChoices,
  removeChoice: (id) => {
    const { flipChoices } = get();
    const newArray = flipChoices.filter((choice) => choice !== id);

    let bookmark = window.location;

    if (newArray.length > 0) {
      const jsonEncoded = JSON.stringify(newArray);
      const base64Encoded = btoa(jsonEncoded);

      bookmark = `${window.location}${base64Encoded}`;
    }

    set({
      bookmark,
      flipChoices: newArray,
    });
  },
  addChoice: (id) => {
    const { flipChoices } = get();
    const newArray = [ ...flipChoices, id];

    let bookmark = window.location;

    if (newArray.length > 0) {
      const jsonEncoded = JSON.stringify(newArray);
      const base64Encoded = btoa(jsonEncoded);

      bookmark = `${window.location}${base64Encoded}`;
    }

    set({
      bookmark,
      flipChoices: newArray,
    });
  },
}));

export default useSiteStore;
