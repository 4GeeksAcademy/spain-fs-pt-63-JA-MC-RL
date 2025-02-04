"""empty message

Revision ID: 8a4148aa0bbc
Revises: 1b1edff34780
Create Date: 2024-06-15 08:32:53.066866

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a4148aa0bbc'
down_revision = '1b1edff34780'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('password_hashed')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hashed', sa.VARCHAR(length=100), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
