# Python
from datetime import datetime
import secrets
# Graphene
import graphene
from graphene import relay, String
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType, utils
# Local
from .utils import input_to_dictionary
from .models import Blog as BlogModel
from .models import User as UserModel
from .models import Role as RoleModel
from .database import db_session

class BlogType(SQLAlchemyObjectType):
    class Meta:
        model = BlogModel
        interfaces = (relay.Node, )

class BlogConnection(relay.Connection):
    class Meta:
        node = BlogType

class UserType(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )

class UserConnections(relay.Connection):
    class Meta:
        node = UserType

class RoleType(SQLAlchemyObjectType):
    class Meta:
        model = RoleModel
        interfaces = (relay.Node, )


class RoleConnection(relay.Connection):
    class Meta:
        node = RoleType

SortEnumUser = utils.sort_enum_for_model(UserModel, 'SortEnumUser',
    lambda c, d: c.upper() + ('_ASC' if d else '_DESC'))
# Queries
class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allow only single column sorting
    users = SQLAlchemyConnectionField(
        UserConnections,
        sort=graphene.Argument(
            SortEnumUser,
            default_value=utils.EnumValue('id_asc', UserModel.id.asc())))
    # Allows sorting over multiple columns, by default over the primary key
    roles = SQLAlchemyConnectionField(RoleConnection)
    # Disable sorting over this field
    blogs = SQLAlchemyConnectionField(BlogConnection, sort=None)

# Mutations
class CreateUser(graphene.Mutation):
    user = graphene.Field(lambda: UserType, description='User created by this mutaiton.')
    token = graphene.String()

    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()

    def mutate(self, info, username, email, password):
        newUser = UserModel(username=username, email=email, password=password)
        db_session.add(newUser)
        db_session.commit()

        token = secrets.token_hex(24)
        return CreateUser(user=newUser, token=token)

class Mutations(graphene.ObjectType):
    createUser = CreateUser.Field()


schema = graphene.Schema(query=Query, types=[BlogType, UserType, RoleType], mutation=Mutations)