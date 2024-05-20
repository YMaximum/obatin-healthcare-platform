import { useClientDisplayResolution } from '@/hooks/useClientDisplayResolution';
import { useEventEmitter } from '@/hooks/useEventEmitter';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import CustomButton from '@/components/atoms/button/CustomButton';
import styled from 'styled-components';

export const ConfirmCheckoutContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;

  width: 100%;
  height: 100%;

  div {
    width: 100%;
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      height: 100%;
      font-size: 16px;
      font-weight: 550;
    }
  }
`;

const UnsetShippingModalButtonsContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;

  width: 50%;
  height: 50px;
  margin-top: 25px;
`;

const ConfirmCheckoutModalContent = (): React.ReactElement => {
  const emitter = useEventEmitter();
  const { setToast } = useToast();
  const { closeModal } = useModal();
  const { isDesktopDisplay } = useClientDisplayResolution();
  const checkoutBreakdown = localStorage.getItem('checkout');
  const totalQuantity = parseInt(checkoutBreakdown?.split(',')?.[0]!, 10);
  const totalShippingCost = parseInt(checkoutBreakdown?.split(',')?.[1]!, 10);
  const totalCheckout = parseInt(checkoutBreakdown?.split(',')?.[2]!, 10);

  return (
    <ConfirmCheckoutContainer>
      <div>
        <span>Checkout</span>
        <p>:</p>
        <span>{totalQuantity} produk</span>
      </div>
      <div>
        <span>Harga Produk</span>
        <p>:</p>
        <span>Rp. {totalCheckout?.toLocaleString('id-ID')}</span>
      </div>
      <div>
        <span>Biaya Pengiriman</span>
        <p>:</p>
        <span>Rp. {totalShippingCost?.toLocaleString('id-ID')}</span>
      </div>
      <div>
        <span>Total Pembelanjaan Anda</span>
        <p>:</p>
        <span>
          Rp.{' '}
          {(totalQuantity * totalCheckout + totalShippingCost).toLocaleString(
            'id-ID',
          )}
        </span>
      </div>

      <UnsetShippingModalButtonsContainer>
        <CustomButton
          content='Batal'
          $width='150px'
          $height='50px'
          $fontSize='22px'
          $bgColor='#de161c'
          onClick={() => {
            localStorage.removeItem('checkout');
            emitter.emit('close-modal-fail');
            closeModal();

            setToast({
              showToast: true,
              toastMessage: 'Silahkan lanjut untuk memilih metode pengiriman',
              toastType: 'warning',
              resolution: isDesktopDisplay ? 'desktop' : 'mobile',
              orientation: 'center',
            });
          }}
        />
        <CustomButton
          content='Lanjutkan'
          $width='150px'
          $height='50px'
          $fontSize='22px'
          onClick={() => {
            localStorage.removeItem('checkout');
            emitter.emit('close-modal-ok');
            closeModal();
          }}
        />
      </UnsetShippingModalButtonsContainer>
    </ConfirmCheckoutContainer>
  );
};

export default ConfirmCheckoutModalContent;
