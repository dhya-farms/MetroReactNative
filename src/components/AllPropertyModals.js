import React from 'react';
import PickupModal from '../modals/PickUpModal';
import DetailsInputModal from '../modals/DetailsInputModal';
import DropModal from '../modals/DropModal';
import AddressModal from '../modals/AddressModal';
import DropAddessConfimModal from '../modals/DropAddressConfirmModal';
import DocumentVerifyModal from '../modals/DocumentVerifyModal';
import CompletePaymentModal from '../modals/CompletePaymentModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import PaymentModal from '../modals/PaymentModal';


const AllModals = ({ modalVisibility, toggleModalVisibility, handleYesPress, handleNoPress, handleDetailsInputDone, dropYesPress, confirmationPress, handleDropAddressDone, sameAddressPress, 
  dropNoPress, handleConfirmPress, handleDetailsPaymentDone, handleDocVeifyDone, handleDetailsFullPaymentDone }) => {
  return (
    <>
       <PickupModal
            modalVisible={modalVisibility.pickupModalVisible}
            setModalVisible={(isVisible) => toggleModalVisibility('pickupModalVisible', isVisible)}
            onYesPress={handleYesPress}
            onNoPress={handleNoPress} // Pass the handler to the modal
          />
          <DetailsInputModal
            modalVisible={modalVisibility.detailsInputModalVisible}
            setModalVisible={(isVisible) => toggleModalVisibility('detailsInputModalVisible', isVisible)}
            onDone={handleDetailsInputDone}
          />
          <DropModal
            modalVisible={modalVisibility.dropModalVisible}
            setModalVisible={(isVisible) => toggleModalVisibility('dropModalVisible', isVisible)}
            dropYesPress={dropYesPress}
            dropNoPress={confirmationPress}
          />
          <AddressModal
            modalVisible={modalVisibility.addressModalVisible}
            setModalVisible={(isVisible) => toggleModalVisibility('addressModalVisible', isVisible)}
            onDone={handleDropAddressDone}
          />
          <DropAddessConfimModal
             modalVisible={modalVisibility.addressConfirmModalVisible}
             setModalVisible={(isVisible) => toggleModalVisibility('addressConfirmModalVisible', isVisible)}
             sameAddressPress={sameAddressPress}
             dropNoPress={dropNoPress}
          />
         <ConfirmationModal
          modalVisible={modalVisibility.confirmationModalVisible}
          setModalVisible={(isVisible) => toggleModalVisibility('confirmationModalVisible', isVisible)}
          handleConfirmPress={handleConfirmPress}
         />
         <PaymentModal
            modalVisible={modalVisibility.paymentModalVisible}
            setModalVisible={(isVisible) => toggleModalVisibility('paymentModalVisible', isVisible)}
            onDone={handleDetailsPaymentDone}
        />
        <DocumentVerifyModal
              modalVisible={modalVisibility.docverifyModalVisible}
              setModalVisible={(isVisible) => toggleModalVisibility('docverifyModalVisible', isVisible)}
              onDone={handleDocVeifyDone}
        />
        <CompletePaymentModal
            modalVisible={modalVisibility.completePaymentModalVisible}
            setModalVisible={(isVisible) => toggleModalVisibility('completePaymentModalVisible', isVisible)}
            onDone={handleDetailsFullPaymentDone}
        />
    </>
  );
};

export default AllModals;