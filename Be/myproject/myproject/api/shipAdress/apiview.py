from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Address, Customers
from .serializers import AddressSerializer

class AddressAPIView(APIView):
    def get(self, request, id=None):
        try:
            # Lấy khách hàng
            customer = get_object_or_404(Customers, customer_id=id)
            
            # Tạo địa chỉ chính
            main_address = {
                "address_id":0,
                "address": customer.address,
                "phone":customer.phone,
                "name": customer.name,
            }
            
            # Lấy danh sách địa chỉ giao hàng
            shipping_addresses = Address.objects.filter(customer=id)
            
            # Serialize danh sách địa chỉ giao hàng (nếu có)
            serialized_addresses = AddressSerializer(shipping_addresses, many=True).data
            for address in serialized_addresses:
                # Thay thế postal_code thành phone nếu tồn tại
                address["phone"] = address.pop("postal_code", None)
                
                # Loại bỏ khóa 'customer'
                if "customer" in address:
                    del address["customer"]
                
                # Thêm name vào từng địa chỉ
                address["name"] = customer.name
            
            # Thêm địa chỉ chính vào kết quả
            result = serialized_addresses + [main_address]
            
            return Response(result, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, id=None):  # `id` là tùy chọn
        try:
            data = request.data

            # Kiểm tra xem đây là yêu cầu cập nhật hay thêm mới
            address_id = data.get('id')  # Lấy ID từ payload
            if address_id:  # Cập nhật địa chỉ
                try:
                    # Lấy bản ghi từ Address
                    ship = Address.objects.get(address_id=address_id)

                    # Tạo dict chứa các trường cần cập nhật
                    update_fields = {}
                    if 'address' in data and ship.address != data['address']:
                        update_fields['address'] = data['address']
                    if 'postal_code' in data and ship.postal_code != data['postal_code']:
                        update_fields['postal_code'] = data['postal_code']

                    # Thực hiện cập nhật nếu có thay đổi
                    if update_fields:
                        Address.objects.filter(address_id=address_id).update(**update_fields)
                        return Response({'message': 'Address updated successfully'}, status=status.HTTP_200_OK)

                    return Response({'message': 'No changes detected'}, status=status.HTTP_200_OK)

                except Address.DoesNotExist:
                    return Response({'error': 'Address does not exist'}, status=status.HTTP_404_NOT_FOUND)

            else:  # Thêm mới địa chỉ
                # Kiểm tra các trường bắt buộc
                if 'address' not in data or 'postal_code' not in data:
                    return Response(
                        {'error': "'address' and 'postal_code' are required for creating a new address"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Tạo địa chỉ mới
                new_address = Address.objects.create(
                    address=data['address'],
                    postal_code=data['postal_code']
                )
                return Response({'message': 'Address created successfully', 'id': new_address.address_id},
                                status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DeleteAddressView(APIView):
    def delete(self, request, id):
        try:
            
            # Lấy địa chỉ cần xóa
            address = Address.objects.filter(address_id=id)
            address.delete()
            return Response({"success": "Xóa thành công"}, status=status.HTTP_200_OK)
        except Address.DoesNotExist:
            return Response({"error": "Địa chỉ giao hàng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
