#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h> 
#include <stdlib.h> 
#include <time.h> 
#include "headerr.h"
 //rand �ߺ� ���� �����ϴ� ��
/*int main()
{
	int num[6] = { 0 };
	srand(time(NULL));
	for (int i = 0; i < 6; i++) {
		num[i] = rand() % 10;
		for (int j = 0; j < i; j++) {
			if (num[i] == num[j]) {// j�� i-1�̶�� �����ϰ� ���� 
				i--;//				j�� i�� ���ٸ� �ٽ� rand�� �����ؾ� �ϹǷ� ���ư��� �ȴ�.
				break;
			}

		}
	}
	for(int i=0;i<6;i++)
	printf("%d ", num[i]);
}*/

/*int main(void) {
	while (1) {
		printf("���� �Է� \n");
		int input = 0;
		scanf("%d", &input);

	}
	return 0;
}*/

/////////////////////////GetAsyncKeyState �Լ� ? x���̳� y ���� ������ ���� 0,0���� ���ư�...
/*int main(void)
{
	int x = 0;
	int y = 0;
	SetConsoleSize(30, 20);//x�� 30 y�� 20���� �����ִ� �Լ�
	while (1) {
		
		Clear();// �ܻ��� �����ִ� �Լ�
		if (GetAsyncKeyState(VK_UP) & 0x8000) {
			y--;//
			if (y < 0) y = 0;
		}
		if (GetAsyncKeyState(VK_DOWN) & 0x8000) {
			y++;
			if (y > 20) y = 20;
		}
		if (GetAsyncKeyState(VK_LEFT) & 0x8000) {
			x--;
			if (x < 0)x = 0;
		}
		if (GetAsyncKeyState(VK_RIGHT) & 0x8000) { 
			x++; 
			if (x > 30)x = 30;
		}
		GotoXY(x, y);
		printf("_");
		Sleep(50);
	}
	
	system("pause");

		return 0;
}*/
//�ٵ����� �迭��
const char *arr[10][10];


void Plate(void) {

	for (int i = 0; i < 10; i++) {
		for (int j = 0; j < 10; j++) {
			arr[i][j] = "��";
		}
	}

	printf(" 0 1 2 3 4 5 6 7 8 9 \n");
	for (int i = 0; i < 10; i++) {
		printf("%d", i);
		for (int j = 0; j < 10; j++) {
			printf("%s", arr[i][j]);
		}printf("\n");
	}
	
}

void Replacing(int *arrp) {
	*arrp = "��";
}

//&arr[i][j]
int main(void) {
	
	Plate();
	while (1) {
		
		int inputa = 0, inputb = 0;
		printf("�Է�\n"); scanf("%d %d", &inputa, &inputb);
		Replacing(arr[inputa][inputb]);
		
	}
	return 0;
}


