#include<stdio.h>
#include<stdlib.h>
#include<time.h>
#include<conio.h>
#include "Console.h";

#define MAX 20//별의 갯수
#define NMAX 10



struct ST_OBJECT {//별 생성 구조체
	int x = 0;
	int y = 0;
	bool bActive = false;
};
ST_OBJECT g_stenemy[MAX];
ST_OBJECT g_stplayer;

void spawn(void) {
	for (int i = 0; i < MAX; i++) {
		if (!g_stenemy[i].bActive) {
			g_stenemy[i].x = (rand() % 15) * 2;
			g_stenemy[i].y = 0;
			g_stenemy[i].bActive = true;
			break;
		}
	}
}

void inputprocess() {
	if (GetAsyncKeyState(VK_LEFT) & 0x8000) {
		g_stplayer.x -= 2;
		if (g_stplayer.x < 0) g_stplayer.x = 0;
	}
	if (GetAsyncKeyState(VK_RIGHT) & 0x8000) {
		g_stplayer.x += 2;
		if (g_stplayer.x > 28)g_stplayer.x = 28;
	}
}

int enemyprocess() {
	int count = 0;
	for (int i = 0; i < MAX; i++) {
		if (g_stenemy[i].bActive) {
			count++;
			GotoXY(g_stenemy[i].x, g_stenemy[i].y);
			printf("☆");
			g_stenemy[i].y++;
			if (g_stenemy[i].y == g_stplayer.y) {
				if (g_stenemy[i].x == g_stplayer.x) {
					g_stplayer.bActive = false;
				}
			}
			if (g_stenemy[i].y > g_stplayer.y) {
				g_stenemy[i].bActive = false;
			}
		}
	}
	return count;
}
void update() {
	if (g_stplayer.bActive) {
		GotoXY(g_stplayer.x, g_stplayer.y);
		printf("▲");
	}
	else {
		GotoXY(g_stplayer.x, g_stplayer.y);
		printf("▒");
	}
}
void init() {

	g_stplayer.x = 14;
	g_stplayer.y = 28;
	g_stplayer.bActive = true;
	srand(time(NULL));
	SetConsoleSize(30, 30);


}
int giscore = 0;
void score(void) {
	if (g_stplayer.bActive) giscore++;
	GotoXY(0, 0);
	printf("스코어 :%d", giscore);

}

void startmenu(void) {
	while (1) {
		Clear();
		GotoXY(10, 9);
		printf("별 피하기");
		GotoXY(10, 15);
		printf("Press any key");

		if (_kbhit()) break;
	}
}
void resultmenu() {
	while (1) {
		Clear();
		GotoXY(10, 9);
		printf("Game Over");
		GotoXY(10, 17);
		printf("Score:%d\n\n\n\n", giscore);
		printf("bye");


		break;
	}
}
int main(void)
{
	int state = 0;
	init();
	startmenu();
	while (1) {

		Clear();
		if (g_stplayer.bActive) {
			spawn();

			inputprocess();
		}
		state = enemyprocess();

		update();

		score();

		Sleep(50);


		if (state == 0) break;

	}
	system("pause");
	return 0;

}

