from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import jwt
import logging
from clinic.models.customuser import CustomUser

logger = logging.getLogger(__name__)


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get("access_token")
        if not token:
            logger.debug("No access token found in cookies")
            return None

        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            logger.debug(f"Decoded JWT token: {decoded_token}")
            user_id = decoded_token.get("user_id")
            if not user_id:
                logger.error("User ID missing from token")
                raise AuthenticationFailed("User ID missing from token")
            user = CustomUser.objects.get(id=user_id)
            return (user, None)

        except jwt.ExpiredSignatureError:
            logger.warning("JWT token has expired")
            raise AuthenticationFailed("Token has expired")
        except jwt.DecodeError:
            logger.error("Error decoding JWT token")
            raise AuthenticationFailed("Invalid token")
        except CustomUser.DoesNotExist:
            logger.error(f"User not found with ID: {user_id}")
            raise AuthenticationFailed("User not found")
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}", exc_info=True)
            raise AuthenticationFailed("Authentication failed")

    def authenticate_header(self, request):
        return "Bearer"


class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.META.get("HTTP_X_API_KEY")
        if not api_key:
            logger.debug("No API key header found")
            return None
        if api_key != settings.API_KEY:
            logger.warning(f"Invalid API key attempt: {api_key}")
            raise AuthenticationFailed("Invalid API key")
        return (None, None)

    def authenticate_header(self, request):
        return "X-API-KEY"
