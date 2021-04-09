pwd
ls | grep CONS
. ./CONSTANTS.sh
INTERNAL_STATUS_PORT=$DATA_UI_SOCKETIO_PORT
echo "SocketIO Port"
echo $INTERNAL_STATUS_PORT
gatsby develop --host=0.0.0.0 --port 8001 & cd searchkit && ./start.sh
# cd searchkit && ./start.sh