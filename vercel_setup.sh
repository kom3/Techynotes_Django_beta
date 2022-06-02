# apt-get install python3-distutils
# apt-get install gcc libpq-dev -y
# apt-get install python-dev  python-pip -y
# apt-get install python3-dev python3-pip python3-venv python3-wheel -y
# Update pip
# python3.9 -m pip install --upgrade pip
apt-get install git
pip install setuptools
pip install wheel
pip install -r requirements.txt

python3.9 manage.py collectstatic

